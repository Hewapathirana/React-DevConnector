import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import {connect} from "react-redux";
import {registeruser} from "../actions/authActions";

class Register extends Component{

    constructor (){
        super();
        this.state = {
            username:'',
            password:'',
            confirmPassword:'',
            errors:{}

        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

     //here we are updating the local state with redux store errors using nextProps
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }

    onChange (e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit (e){
        e.preventDefault();

        const newUser ={
            username:this.state.username,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword

        }

        this.props.registeruser(newUser ,this.props.history);

        // axios.post('/api/users/register',newUser)
        //     .then(res=>console.log(res.data))
        //     .catch(err=>this.setState({errors:err.response.data}));


        console.log(newUser);
    }



    render() {
        const {errors} = this.state;



        return (
            <div className="register">


                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>

                                <div className="form-group">
                                    <input type="email" className={classnames('form-control form-control-lg',{
                                        'is-invalid':errors.username
                                    })} placeholder="Email Address" name="username" value={this.state.email} onChange={this.onChange}  />

                                    {errors.username &&(<div className="invalid-feedback">{errors.username}</div>)}

                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames('form-control form-control-lg',{
                                        'is-invalid':errors.password
                                    })} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                                    {errors.password &&(<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames('form-control form-control-lg',{
                                        'is-invalid':errors.confirmPassword
                                    })} placeholder="Confirm Password" name="confirmPassword"  value={this.state.confirmPassword} onChange={this.onChange} />
                                    {errors.confirmPassword &&(<div className="invalid-feedback">{errors.confirmPassword}</div>)}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

//this is a best practise where other developers can easily understand what props and there types to be passed to this component
Register.propTypes = {
    registeruser:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const  mapStateToProps = (state) =>({
    auth: state.auth,
    errors: state.errors
});
//here we add withRouter because we are directing after succesfully registering in registeruser tomlogin page
export default connect(mapStateToProps,{registeruser})(withRouter(Register));
