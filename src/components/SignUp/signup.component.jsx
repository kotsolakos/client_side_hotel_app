import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user-context/user.context';

const defaultFormFields = {
    email: '',
    password: '',
    name: ''
}

const SignUp = ({setIsSignedIn}) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password, name } = formFields;
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]:value})
    };


    const onSubmitSignUp = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
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
                alert("The email you gave already exists");
            }
        })
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            />
                        </div>
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
                            value="Sign up"
                            onClick={onSubmitSignUp}
                        />
                    </div>
                </div>
            </main>
        </article>
    );
  }
  
  export default SignUp;


    