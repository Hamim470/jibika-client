"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "@heroui/react";
import { createCompany } from "@/lib/actions/companies";

const CompanyProfile = ({ recruiter, recruiterCompany }) => {
  // Company state initialized from fetched backend data
  const [company, setCompany] = useState(recruiterCompany || null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: company?.name || "",
    category: company?.category || "Software Development",
    website: company?.website || "",
    location: company?.location || "Dhaka, Bangladesh",
    employeeCount: company?.employeeCount || "1-10",
    logoUrl: company?.logoUrl || "",
    description: company?.description || "",
    recruiterId: recruiter?.id || recruiter?._id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle ImgBB Logo Upload
  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      toast("ImgBB API key is missing in environment variables.");
      setUploadingLogo(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        const hostedUrl = result.data.url;
        setFormData((prev) => ({ ...prev, logoUrl: hostedUrl }));
        toast.success("Logo uploaded successfully via ImgBB!");
      } else {
        throw new Error(result.error?.message || "Upload failed");
      }
    } catch (err) {
      console.error("ImgBB upload error:", err);
      toast("Failed to upload logo to ImgBB.");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        recruiterId: recruiter?.id || recruiter?._id,
        recruiterEmail: recruiter?.email || recruiter?.user?.email,
        status: company && company?.status ? company?.status : "pending",
      };

      if (company?._id) {
        payload._id = company._id;
      }

      const res = await createCompany(payload);

      if (res?.insertedId || res?.acknowledged) {
        const updatedCompany = {
          ...payload,
          _id: res.insertedId || company?._id,
        };
        setCompany(updatedCompany);
        setIsEditing(false);
        toast.success("Company profile saved successfully! Awaiting admin approval.");
      } else {
        throw new Error("Failed to save company");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast(err.message || "Failed to save company profile.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Helper for status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-950 text-emerald-400 border-emerald-800/60";
      case "rejected":
        return "bg-red-950 text-red-400 border-red-800/60";
      default:
        return "bg-amber-950 text-amber-400 border-amber-800/60";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-8 pb-16"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Company Profile
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage your company identity, public visibility, and verification status.
          </p>
        </div>

        {company && !isEditing && (
          <button
            onClick={() => {
              setFormData({
                name: company.name || "",
                category: company.category || "Software Development",
                website: company.website || "",
                location: company.location || "",
                employeeCount: company.employeeCount || "1-10",
                logoUrl: company.logoUrl || "",
                description: company.description || "",
                recruiterId: recruiter?.id || recruiter?._id || "",
              });
              setIsEditing(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-semibold text-sm hover:bg-zinc-800 hover:text-white transition-all shrink-0"
          >
            Edit Company Info
          </button>
        )}
      </div>

      {/* STATE 1: Unregistered Prompt */}
      {!company?._id && !isEditing && (
        <div className="p-12 text-center rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6 shadow-xl backdrop-blur-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800 flex items-center justify-center text-3xl">
            🏢
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-xl font-bold text-white">No Company Registered Yet</h2>
            <p className="text-sm text-zinc-400">
              You need a registered and approved company profile before you can publish active job listings on Jibika.
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg transition-all"
          >
            Register Company
          </button>
        </div>
      )}

      {/* STATE 2: Company Details Card */}
      {company?._id && !isEditing && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6 shadow-xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-800/80 pb-6">
              <div className="flex items-center gap-5">
                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-zinc-800 bg-zinc-950"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-2xl flex items-center justify-center">
                    {company.name ? company.name.charAt(0) : "C"}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-white">{company.name}</h2>
                  <p className="text-sm text-zinc-400">{company.category}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                  Status:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadge(
                    company.status
                  )}`}
                >
                  {company.status}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              <div>
                <span className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
                  Location
                </span>
                <span className="font-medium text-zinc-200">{company.location}</span>
              </div>

              <div>
                <span className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
                  Employee Count
                </span>
                <span className="font-medium text-zinc-200">{company.employeeCount} employees</span>
              </div>

              <div>
                <span className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
                  Website URL
                </span>
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-emerald-400 hover:underline truncate block"
                  >
                    {company.website}
                  </a>
                ) : (
                  <span className="text-zinc-500">Not specified</span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <div className="pt-4 border-t border-zinc-800/80">
              <span className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                About Company
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed">{company.description}</p>
            </div>
          </div>

          {/* Pending Alert Note */}
          {company.status === "pending" && (
            <div className="bg-amber-950/40 border border-amber-800/60 p-4 rounded-xl text-amber-200 text-xs flex items-start gap-3">
              <span className="text-base">⏳</span>
              <p>
                Your company profile is under review by Jibika administrators. Once approved, your listings will appear in public candidate searches.
              </p>
            </div>
          )}
        </div>
      )}

      {/* STATE 3: Register / Edit Company Form */}
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6 shadow-xl backdrop-blur-md"
        >
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {company ? "Edit Company Profile" : "Register New Company"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Tech Solutions Ltd."
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            {/* Industry / Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Industry / Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                <option value="Software Development">Software Development</option>
                <option value="UI/UX & Design">UI/UX & Design</option>
                <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                <option value="Healthcare & Medical">Healthcare & Medical</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Finance & Accounting">Finance & Accounting</option>
              </select>
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Website URL
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Headquarters Location *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Dhaka, Bangladesh"
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            {/* Employee Count Range */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Employee Count Range *
              </label>
              <select
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                <option value="1-10">1 - 10 employees</option>
                <option value="11-50">11 - 50 employees</option>
                <option value="51-200">51 - 200 employees</option>
                <option value="201-500">201 - 500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>

            {/* Logo Upload via ImgBB */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Company Logo {uploadingLogo && "(Uploading to ImgBB...)"}
              </label>
              <div className="flex items-center gap-4">
                {formData.logoUrl && (
                  <img
                    src={formData.logoUrl}
                    alt="Logo Preview"
                    className="w-12 h-12 rounded-xl object-cover border border-zinc-800 bg-zinc-950"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingLogo}
                  onChange={handleLogoUpload}
                  className="block w-full text-xs text-zinc-400 file:mr-4 file:py-2 py-1 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer disabled:opacity-50"
                />
              </div>
            </div>

            {/* Short Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Company Description *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a brief background about your company's mission and team culture..."
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-y"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-800">
            {company && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-sm hover:bg-zinc-800 hover:text-white transition-all"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading || uploadingLogo}
              className="px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Company Profile"
              )}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default CompanyProfile;