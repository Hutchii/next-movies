import ReactMarkdown from "react-markdown";
import Link from "next/link";
import styled from "styled-components";

export default function Markdown({ content }) {
  return (
    <ReactMarkdown
      className="title-slug--markdown"
      components={{
        a: ({ children, href }) => (
          <Link href={href}>
            <a>{children[0]}</a>
          </Link>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
