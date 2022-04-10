import SpecialPostsImage from "./SpecialPostsImage";
import { dateConverter } from "../../libs/dateConverter";
import { directorsFormatter } from "../../libs/directorsFormatter";

export default function SpecialPostsPost({ data }) {
  return (
    <div className="special-post card margin--small">
      <SpecialPostsImage image={data[0].attributes.image.data.attributes.url} />
      <div className="special-post--text spacer">
        <p className="color--gold special-post--info">{`By ${directorsFormatter(
          data[0].attributes.directors.data
        )}`}</p>
        <h1 className="heading--26">{data[0].attributes.title}</h1>
        <p className="paragraph--18">{data[0].attributes.description}</p>
        <p className="color--grey special-post--info">
          {dateConverter(data[0].attributes.createdAt)}
        </p>
      </div>
    </div>
  );
}
