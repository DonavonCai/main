import {Query} from "react-apollo";
import gql from "graphql-tag";
import Button from '../global/Button';

export const storiesQuery = gql`
 query Stories {
  stories {
    nodes {
      details {
        content
        facebook
        image {
          sourceUrl
        }
        github
        instagram
        linkedin
        name
        title
        twitter
      }
      order {
        position
      }
    }
  }
}
`;

export default function Story() {
  return (
    <Query query={storiesQuery} >
      {({loading, error, data}) => {
        if (error) return <aside>Error loading stories!</aside>;
        if (loading) return <div>Loading</div>;

        const stories = data.stories.nodes;
        const social =
          ["twitter", "instagram", "linkedin", "github", "facebook"];

        return (
          <div id="story-container"
            className="container-full bg-black" >
            <div id="story-slider" uk-slider="true">
              <ul
                className="uk-slider-items uk-child-width-1-1@l">
                {stories.map((story, index) => {
                  const image = story.details.image.sourceUrl;
                  const {details} = story;
                  const {name, title, content} = details;

                  return (
                    <li key={index}>
                      <div id="story" className="uk-container">
                        <img className="story-image"
                          src={image}
                        />
                        <div className="story-content">
                          <p className="heading">Success Story</p>
                          <img className="story-image-mobile"
                            src={image}
                          />
                          <p className="story-header">
                            <span className="name">{name}</span>
                            <span className="red"> - </span>
                            <span className="title">{title}</span>
                          </p>
                          <p className="story-social">
                            {social.map((outlet, index) => details[outlet] &&
                          <a key={index} href={details[outlet]}>
                            <span uk-icon={`icon: ${outlet}; ratio: 1`}/>
                          </a>
                            )}
                          </p>
                          <p className="story-text">
                            {content.substring(0, 200) + "…"}
                          </p>

                          <Button
                            classes="uk-align-left"
                            toggle={`target: #story-modal-${index}`}
                            label="Read Story"
                            width={2}/>
                        </div>
                      </div>

                      <div id={`story-modal-${index}`} uk-modal="true">
                        <div className="uk-modal-dialog uk-modal-body">
                          <h2 className="uk-modal-title">{name}</h2>
                          <p><strong>{title}</strong></p>
                          <p>
                            {content}
                          </p>
                          <span className="uk-modal-close"
                            uk-icon={`icon: close; ratio: 2`}/>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <ul class="uk-slider-nav uk-dotnav storydotnav uk-flex-center "></ul>
            </div>
          </div>);
      }}
    </Query>
  );
}
