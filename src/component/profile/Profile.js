import  React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount() {
   //console.log("this.props.profile.experiences %%%%%%%%", this.props.profile.experiences)

    if (this.props.match.params.handle) {


      this.props.getProfileByHandle(this.props.match.params.handle);
      console.log("this.props.match.params ======", this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("this.props.profile  *****", this.props.profile);
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');

      console.log("this.props.profile  NOT FOUND", this.props.profile);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    console.log("profile.experiences",this.props.match.params.experiences );




    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.educations}
            experience={profile.experiences}
          />
          {/*{profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}*/}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
