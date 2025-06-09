import { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://furniture-store-backend-29c0.onrender.com/user/getalluser', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // ✅ Handle role update (optional, if you implement role change)
  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(
        `https://furniture-store-backend-29c0.onrender.com/user/role/${id}`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      fetchUsers();
    } catch (err) {
      console.error("Role change failed:", err);
    }
  };

  // ✅ Toggle block/unblock
  const toggleBlockUser = async (id, isBlocked) => {
    const url = isBlocked
      ? `https://furniture-store-backend-29c0.onrender.com/user/unblock/${id}`
      : `https://furniture-store-backend-29c0.onrender.com/user/block/${id}`;

    try {
      await axios.put(url, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Block/unblock failed:", err);
    }
  };

  // ✅ Delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`https://furniture-store-backend-29c0.onrender.com/user/delete/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        fetchUsers();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  {user.isBlocked ? (
                    <span className="text-red-600 font-semibold">Blocked</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Active</span>
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => toggleBlockUser(user._id, user.isBlocked)}
                    className={`px-3 py-1 rounded text-white ${
                      user.isBlocked ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 rounded bg-gray-600 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
