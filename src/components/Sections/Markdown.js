import ReactMarkdown from "react-markdown";
import Link from "next/link";

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
