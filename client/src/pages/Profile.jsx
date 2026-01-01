import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10 text-[#1A1A1A] dark:text-gray-300">Loading profile...</p>;

  if (!profile) return <p className="text-center mt-10 text-[#1A1A1A] dark:text-gray-300">No profile found.</p>;

  const { user, reviewCount } = profile;

  return (
    <div className="flex flex-col items-center mt-10">
      <div
        className="bg-[#FFFFFF] dark:bg-card 
        border border-[#d0d0d0] dark:border-gray-800
        text-[#1A1A1A] dark:text-gray-300
        p-6 rounded-lg shadow-md w-[90%] md:w-[400px] text-center 
        transition-colors duration-300"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#A06CD5]">👤 Profile Dashboard</h2>

        <p className="mb-2">
          <strong className="text-[#1A1A1A] dark:text-gray-200">Name:</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong className="text-[#1A1A1A] dark:text-gray-200">Email:</strong> {user.email}
        </p>
        <p className="mb-2 text-[#444444] dark:text-gray-400">
          <strong className="text-[#1A1A1A] dark:text-gray-200">Joined Since:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p className="text-[#444444] dark:text-gray-400">
          <strong className="text-[#1A1A1A] dark:text-gray-200">Total Reviews:</strong> {reviewCount}
        </p>
      </div>
    </div>
  );
}
