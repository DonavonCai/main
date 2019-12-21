import {Query} from "react-apollo";
import gql from "graphql-tag";
// import MemberList from "../MemberList"; not in use
import Loader from './global/Loader';

export const communityQuery = gql `
  query Community {
    community (first: 100) {
      nodes {
        details {
          dateOfEvent
          description
          imageCard {
            sourceUrl
          }
          imageModal {
            sourceUrl
          }
        }
        order {
          position
        }
      }
    }
  }  
`;

export default function Community() {
  return (
    <Query query={communityQuery} >
      {({loading, error, data}) => {
        if (error) return <aside>Error loading community!</aside>;
        if (loading) return <Loader />;

        const community = data.community.nodes.sort((a, b) =>
          a.order.position - b.order.position);

        return (
          <div
            id="community-container"
            className="container-full"
            style={{backgroundImage:
              "url(\"/static/images/desktop/iesd-bg-light.jpg\")",
            }}>

            <div id="community" className="uk-container">
              <p className="memberlist-header heading">Community</p>
              <div uk-slider="true" className="uk-slider uk-slider-container">
                <ul className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-4@m uk-child-width-1-5@l uk-grid">
                  {community.map((moment, index) => {
                    const {
                      dateOfEvent,
                      description,
                      imageCard,
                      imageModal,
                    } = moment.details;

                    return (<li key={index}>
                      <div className="uk-card uk-card-default">
                        <div className="uk-card-media-top">
                          <div uk-toggle={`target: #community-${index}`}>
                            <img className="uk-blend-multiply uk-width-1-1" src={ imageCard ? imageCard.sourceUrl : "/static/images/desktop/placeholder.jpg" } alt={dateOfEvent} title={description}/>
                            <div className="uk-position-center">
                              <time className="uk-text-center white uk-display-block">{dateOfEvent}</time>
                              <p className="uk-h4 uk-margin-remove uk-text-center uk-margin-medium-top white"><small>view more</small></p>
                            </div>
                          </div>
                        </div>

                        <div id={`community-${index}`} uk-modal="true">
                          <div className="community-dialog-box uk-modal-dialog uk-modal-body image-modal">
                            <span className="uk-modal-close uk-icon">close</span>
                            <img src={ imageModal ? imageModal.sourceUrl : "/static/images/desktop/placeholder.jpg" } />
                          </div>
                        </div>
                      </div>
                    </li>
                    );
                  },
                  )}
                </ul>
                <ul className="uk-slider-nav uk-dotnav
                  uk-flex-center uk-margin"
                />
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
}
