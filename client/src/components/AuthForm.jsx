import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const { user, login, register, logout } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(form.username, form.password);
        navigate('/'); // Redirect to home page after login
      } else {
        if (!form.email) {
          throw new Error('Email is required for registration');
        }
        await register(form.username, form.email, form.password);
        navigate('/'); // Redirect to home page after registration
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  if (user) {
    return (
      <div className="p-4 bg-white dark:bg-gray-900 rounded shadow text-center">
        <div className="mb-2">Logged in as <b>{user.username}</b></div>
        <button className="bg-primary text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
      <form onSubmit={handleSubmit}>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="form-input mb-2 w-full" required />
        {!isLogin && (
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="form-input mb-2 w-full" required />
        )}
        <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" className="form-input mb-2 w-full" required />
        <button className="bg-primary text-white px-4 py-2 rounded w-full" type="submit">{isLogin ? 'Login' : 'Register'}</button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
      <div className="mt-2 text-center">
        <button className="text-blue-600 underline" onClick={() => setIsLogin(l => !l)}>
          {isLogin ? 'No account? Register' : 'Have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
