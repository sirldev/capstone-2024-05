from typing import Dict, List, Tuple

from langchain_core.documents import Document
from langchain_text_splitters import (HeaderType, LineType,
                                      MarkdownHeaderTextSplitter)


class MarkdownHeaderGroupSplitter(MarkdownHeaderTextSplitter):
    def __init__(
        self,
        headers_to_split_on_cnt: int,
        return_each_line: bool = False,
        strip_headers: bool = True,
    ):
        """Create a new MarkdownHeaderTextSplitter.

        Args:
            headers_to_split_on: Headers we want to track
            return_each_line: Return each line w/ associated headers
            strip_headers: Strip split headers from the content of the chunk
        """
        # Output line-by-line or aggregated into chunks w/ common headers
        self.return_each_line = return_each_line
        # Given the headers we want to split on,
        # (e.g., "#, ##, etc") order by length
        self.headers_to_split_on = [
            ("#"*i, "#"*i) for i in range(1, headers_to_split_on_cnt+1)
        ]
        self.headers_to_split_on_cnt = headers_to_split_on_cnt
        # Strip headers split headers from the content of the chunk
        self.strip_headers = strip_headers

    def aggregate_lines_to_chunks(self, lines: List[LineType]) -> List[Document]:
        """Combine lines with common metadata into chunks
        Args:
            lines: Line of text / associated header metadata
        """
        aggregated_chunks: List[LineType] = []
        memo_chunks: List[List[str, str]] = [["", ""]] * (self.headers_to_split_on_cnt+1)

        for line in lines:
            header_name = line["metadata"]["#" * len(line["metadata"])]
            if memo_chunks[len(line["metadata"])][0] == header_name and len(memo_chunks[len(line["metadata"])][1]) <= 10000:
                memo_chunks[len(line["metadata"])][1] += "\n" + line["content"]

            elif len(line["metadata"]) < self.headers_to_split_on_cnt:
                memo_chunks = memo_chunks[:len(line["metadata"])] + [["", ""]] * (self.headers_to_split_on_cnt+1-len(line["metadata"]))
                memo_chunks[len(line["metadata"])] = [header_name, line["content"]]

            elif len(line["metadata"]) == self.headers_to_split_on_cnt:
                if memo_chunks[len(line["metadata"])][1] != "":
                    temp_chunk = LineType()
                    temp_chunk["metadata"] = {"#"*i: header for i, (header, _) in enumerate(memo_chunks) if i != 0}
                    temp_chunk["content"] = " ".join([s[1] for s in memo_chunks])
                    aggregated_chunks.append(temp_chunk)

                memo_chunks[len(line["metadata"])] = [header_name, line["content"]]

        temp_chunk = LineType()
        temp_chunk["metadata"] = {"#"*i: header for i, (header, _) in enumerate(memo_chunks) if i != 0}
        temp_chunk["content"] = "".join([s[1] for s in memo_chunks])
        aggregated_chunks.append(temp_chunk)

        return [
            Document(page_content=chunk["content"], metadata=chunk["metadata"])
            for chunk in aggregated_chunks
        ]

    def split_text(self, text: str) -> List[Document]:
        """Split markdown file
        Args:
            text: Markdown file"""

        # Split the input text by newline character ("\n").
        lines = text.split("\n")
        # Final output
        lines_with_metadata: List[LineType] = []
        # Content and metadata of the chunk currently being processed
        current_content: List[str] = []
        current_metadata: Dict[str, str] = {}
        # Keep track of the nested header structure
        # header_stack: List[Dict[str, Union[int, str]]] = []
        header_stack: List[HeaderType] = []
        initial_metadata: Dict[str, str] = {}

        in_code_block = False
        opening_fence = ""

        for line in lines:
            stripped_line = line.strip()

            if not in_code_block:
                # Exclude inline code spans
                if stripped_line.startswith("```") and stripped_line.count("```") == 1:
                    in_code_block = True
                    opening_fence = "```"
                elif stripped_line.startswith("~~~"):
                    in_code_block = True
                    opening_fence = "~~~"
            else:
                if stripped_line.startswith(opening_fence):
                    in_code_block = False
                    opening_fence = ""

            if in_code_block:
                current_content.append(stripped_line)
                continue

            # Check each line against each of the header types (e.g., #, ##)
            for sep, name in self.headers_to_split_on:
                # Check if line starts with a header that we intend to split on
                if stripped_line.startswith(sep) and (
                    # Header with no text OR header is followed by space
                    # Both are valid conditions that sep is being used a header
                    len(stripped_line) == len(sep) or stripped_line[len(sep)] == " "
                ):
                    # Ensure we are tracking the header as metadata
                    if name is not None:
                        # Get the current header level
                        current_header_level = sep.count("#")

                        # Pop out headers of lower or same level from the stack
                        while (
                            header_stack
                            and header_stack[-1]["level"] >= current_header_level
                        ):
                            # We have encountered a new header
                            # at the same or higher level
                            popped_header = header_stack.pop()
                            # Clear the metadata for the
                            # popped header in initial_metadata
                            if popped_header["name"] in initial_metadata:
                                initial_metadata.pop(popped_header["name"])

                        # Push the current header to the stack
                        header: HeaderType = {
                            "level": current_header_level,
                            "name": name,
                            "data": stripped_line[len(sep):].strip(),
                        }
                        header_stack.append(header)
                        # Update initial_metadata with the current header
                        initial_metadata[name] = header["data"]

                    # Add the previous line to the lines_with_metadata
                    # only if current_content is not empty
                    if current_content:
                        lines_with_metadata.append(
                            {
                                "content": "\n".join(current_content),
                                "metadata": current_metadata.copy(),
                            }
                        )
                        current_content.clear()

                    if not self.strip_headers:
                        current_content.append(stripped_line)

                    break
            else:
                if stripped_line:
                    current_content.append(stripped_line)
                elif current_content:
                    lines_with_metadata.append(
                        {
                            "content": "\n".join(current_content),
                            "metadata": current_metadata.copy(),
                        }
                    )
                    current_content.clear()

            current_metadata = initial_metadata.copy()

        if current_content:
            lines_with_metadata.append(
                {"content": "\n".join(current_content), "metadata": current_metadata}
            )

        # lines_with_metadata has each line with associated header metadata
        # aggregate these into chunks based on common metadata
        if not self.return_each_line:
            return self.aggregate_lines_to_chunks(lines_with_metadata)
        else:
            return [
                Document(page_content=chunk["content"], metadata=chunk["metadata"])
                for chunk in lines_with_metadata
            ]
