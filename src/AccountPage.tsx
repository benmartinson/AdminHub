import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AccountPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const user = useQuery(api.users.currentUser);
  const updateAccount = useMutation(api.users.updateUser);

  const [lastSavedField, setLastSavedField] = useState<string | null>(null);
  let saveSuccessTimeout: NodeJS.Timeout | null = null;

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});
  let errorClearTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (user) {
      if (name !== (user.name || "")) setName(user.name || "");
      if (phone !== (user.phone || "")) setPhone(user.phone || "");
      if (email !== (user.email || "")) setEmail(user.email || "");
    }
    return () => {
      if (saveSuccessTimeout) clearTimeout(saveSuccessTimeout);
      if (errorClearTimeoutRef.current)
        clearTimeout(errorClearTimeoutRef.current);
    };
  }, [user]);

  const handleFieldBlur = async (
    field: "name" | "phone" | "email",
    value: string,
  ) => {
    if (!user) return;

    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    if (errorClearTimeoutRef.current) {
      clearTimeout(errorClearTimeoutRef.current);
      errorClearTimeoutRef.current = null;
    }

    const currentValue = user[field] || "";
    if (value === currentValue) return;

    if (
      field === "email" &&
      user.email === "benmartinson92@gmail.com" &&
      value !== user.email
    ) {
      const errorMsg = "This email address cannot be changed.";
      setFieldErrors((prev) => ({ ...prev, email: errorMsg }));
      errorClearTimeoutRef.current = setTimeout(() => {
        setFieldErrors((prev) => ({ ...prev, email: undefined }));
        errorClearTimeoutRef.current = null;
      }, 3000);
      return;
    }

    try {
      await updateAccount({ [field]: value || undefined });
      setLastSavedField(field);
      if (saveSuccessTimeout) clearTimeout(saveSuccessTimeout);
      saveSuccessTimeout = setTimeout(() => {
        setLastSavedField(null);
      }, 2000);
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
      setLastSavedField(null);
      const errorMsg = `Failed to update ${field}.`;
      setFieldErrors((prev) => ({ ...prev, [field]: errorMsg }));
      errorClearTimeoutRef.current = setTimeout(() => {
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
        errorClearTimeoutRef.current = null;
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-md">
        <h1 className="text-2xl font-semibold text-slate-700 mb-6">
          Account Details
        </h1>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-600 mb-1"
            >
              Name
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleFieldBlur("name", name)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-slate-700 pr-8"
                placeholder="Your Name"
              />
              {lastSavedField === "name" && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 mt-0.5 text-green-500">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
            </div>
            {fieldErrors.name && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-600 mb-1"
            >
              Phone Number
            </label>
            <div className="relative flex items-center">
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => handleFieldBlur("phone", phone)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-slate-700 pr-8"
                placeholder="Your Phone Number"
              />
              {lastSavedField === "phone" && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 mt-0.5 text-green-500">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
            </div>
            {fieldErrors.phone && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-600 mb-1"
            >
              Email
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleFieldBlur("email", email)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-slate-700 pr-8"
                placeholder="you@example.com"
              />
              {lastSavedField === "email" && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 mt-0.5 text-green-500">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
            </div>
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
