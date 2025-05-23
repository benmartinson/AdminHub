import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppConfig } from "@/types";

const ConfigurationPage = ({ appConfig }: { appConfig: AppConfig }) => {
  const [domain, setDomain] = useState(appConfig?.domain || "");
  const [testUrl, setTestUrl] = useState(appConfig?.testUrl || "");
  const [convexUrl, setConvexUrl] = useState(appConfig?.convexUrl || "");
  const [lastSavedField, setLastSavedField] = useState<
    "domain" | "testUrl" | "convexUrl" | null
  >(null);
  const [saveSuccessTimeout, setSaveSuccessTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const createConfig = useMutation(api.appConfiguration.createAppConfiguration);
  const updateConfig = useMutation(api.appConfiguration.updateAppConfiguration);

  const handleFieldBlur = async (
    field: "domain" | "testUrl" | "convexUrl",
    value: string,
  ) => {
    if (!appConfig) {
      await createConfig({
        domain: field === "domain" ? value : "",
        testUrl: field === "testUrl" ? value : "",
        convexUrl: field === "convexUrl" ? value : "",
        appId: 1,
      });
      return;
    }

    const currentValue = appConfig[field] || "";
    if (value === currentValue) return;

    try {
      await updateConfig({
        id: appConfig._id,
        domain: field === "domain" ? value : appConfig.domain || "",
        testUrl: field === "testUrl" ? value : appConfig.testUrl || "",
        convexUrl: field === "convexUrl" ? value : appConfig.convexUrl || "",
        appId: appConfig.appId,
      });
      setLastSavedField(field);
      if (saveSuccessTimeout) clearTimeout(saveSuccessTimeout);
      setSaveSuccessTimeout(
        setTimeout(() => {
          setLastSavedField(null);
        }, 2000),
      );
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
      setLastSavedField(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <label
          htmlFor="testUrl"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Test URL
        </label>
        <div className="relative w-1/2 flex items-center">
          <input
            type="text"
            id="testUrl"
            className="block w-full px-3 bg-white py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter the test URL you want to use to view the app"
            value={testUrl}
            onBlur={() => handleFieldBlur("testUrl", testUrl)}
            onChange={(e) => setTestUrl(e.target.value)}
          />
          {lastSavedField === "testUrl" && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 mt-0.5 text-green-500">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="vercelDomain"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Domain
        </label>
        <div className="relative w-1/2 flex items-center">
          <input
            type="text"
            id="vercelDomain"
            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter your deployment domain"
            value={domain}
            onBlur={() => handleFieldBlur("domain", domain)}
            onChange={(e) => setDomain(e.target.value)}
          />
          {lastSavedField === "domain" && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 mt-0.5 text-green-500">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="convexUrl"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Convex URL
        </label>
        <div className="relative w-1/2 flex items-center">
          <input
            type="text"
            id="convexUrl"
            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter your Convex deployment URL"
            value={convexUrl}
            onBlur={() => handleFieldBlur("convexUrl", convexUrl)}
            onChange={(e) => setConvexUrl(e.target.value)}
          />
          {lastSavedField === "convexUrl" && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 mt-0.5 text-green-500">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPage;
