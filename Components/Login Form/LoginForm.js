import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [errorMsg, seterrorMsg] = useState('')

    const router = useRouter();

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        // Handle form submission logic here (e.g., send login request)


        try {
            const result = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false,
                // callbackUrl:'/'
            })

            console.log(result);
            if (result?.ok) {
                setEmail('');
                setPassword('');
                toast.success('Sign in Successfully')
                localStorage.setItem('token','55555')
                router.push('/lead');
            } else {
                toast.error(result?.error)
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
                <label htmlFor="email">
                    {/* <AiOutlineMail /> */}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your official email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">
                    {/* <AiOutlineLock /> */}
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Sign In</button>

            <button onClick={() => setPassword('123Muzammil$')}>pass</button>
        </form>
    );
};

export default LoginForm;