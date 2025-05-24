// ResetPassword.jsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`/api/reset-password/${token}`, { password });
    setMsg(res.data.message);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Reset Password
        </button>
      </form>
      {msg && <p className="mt-4 text-green-600">{msg}</p>}
    </div>
  );
}
export default ResetPassword