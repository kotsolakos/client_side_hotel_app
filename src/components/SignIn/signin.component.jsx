import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user-context/user.context';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = ({setIsSignedIn}) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]:value})
    };

    const onSubmitSignIn = () => {
        fetch('http://localhost:3000/siqnin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                setUser(user);
                setIsSignedIn(true);
                navigate("/home");
            }
            else{
                alert("The credentials you gave are incorrect");
            }
        })
        // setIsSignedIn(true);
        //         navigate("/home");
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                            <input
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                            onClick={onSubmitSignIn}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <Link to='/signup' className="f6 link dim black db pointer">Register</Link>
                    </div>
                </div>
            </main>
        </article>
    );
  }
  
  export default SignIn;