import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(
        `https://company-verifier-backend.onrender.com/search?company=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Could not connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const platforms = results
    ? [
        {
          name: "LinkedIn",
          description: "Check official company page",
          color: "border-blue-200 hover:border-blue-400 hover:bg-blue-50",
          iconBg: "bg-blue-100",
          icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-blue-700">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          ),
          url: results.linkedin,
          badge: null,
        },
        {
          name: "Twitter / X",
          description: "Find official handle",
          color: "border-gray-200 hover:border-gray-400 hover:bg-gray-50",
          iconBg: "bg-gray-100",
          icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-800">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          ),
          url: results.twitter,
          badge: null,
        },
        {
          name: "Google Search",
          description: "Search for official website",
          color: "border-amber-200 hover:border-amber-400 hover:bg-amber-50",
          iconBg: "bg-amber-100",
          icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          ),
          url: results.google,
          badge: null,
        },
        {
          name: "Glassdoor",
          description: "Check company reviews & ratings",
          color: "border-green-200 hover:border-green-400 hover:bg-green-50",
          iconBg: "bg-green-100",
          icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-600">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          ),
          url: results.glassdoor,
          badge: null,
        },
        {
          name: "ScamAdviser",
          description: results.scamScore
            ? `Trust Score: ${results.scamScore}/100`
            : "Check website trust score",
          color:
            results.scamScore === null
              ? "border-purple-200 hover:border-purple-400 hover:bg-purple-50"
              : results.scamScore >= 70
              ? "border-green-200 hover:border-green-400 hover:bg-green-50"
              : results.scamScore >= 40
              ? "border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50"
              : "border-red-200 hover:border-red-400 hover:bg-red-50",
          iconBg:
            results.scamScore === null
              ? "bg-purple-100"
              : results.scamScore >= 70
              ? "bg-green-100"
              : results.scamScore >= 40
              ? "bg-yellow-100"
              : "bg-red-100",
          icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-purple-600">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 14l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z" />
            </svg>
          ),
          url: results.scamUrl,
          badge: results.scamScore !== null ? results.scamScore : null,
        },
        ...(results.officialWebsite
          ? [
              {
                name: "Official Website",
                description: results.officialWebsiteTitle || "Company website",
                color: "border-blue-200 hover:border-blue-400 hover:bg-blue-50",
                iconBg: "bg-blue-100",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-blue-700">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                ),
                url: results.officialWebsite,
                badge: null,
              },
            ]
          : []),
      ]
    : [];

  return (
    <div
  className="relative min-h-screen flex flex-col items-center justify-center px-4"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Overlay for blur + dim effect */}
  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0" />
  <div className="relative z-10 w-full flex flex-col items-center">      {/* Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">

        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            🛡️ Scam Protection Tool
          </span>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Company Verifier
        </h1>
        <p className="text-gray-400 text-center text-sm mb-8">
          Verify if a company is legitimate before accepting any job or internship offer
        </p>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="e.g. Infosys, TCS, Google..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          />
          <button
            onClick={handleCheck}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition disabled:opacity-50 text-sm"
          >
            {loading ? "..." : "Check"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Results */}
        {results && (
          <div>
            <p className="text-xs text-gray-400 mb-3">
              Results for{" "}
              <span className="font-semibold text-gray-600">
                "{results.company}"
              </span>{" "}
              — click each to verify manually
            </p>
            <div className="flex flex-col gap-3">
              {platforms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 border rounded-xl px-4 py-3 transition cursor-pointer ${p.color}`}
              >
                <div className={`p-2 rounded-lg ${p.iconBg}`}>
                  {p.icon}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {p.description}
                  </p>
                </div>

                {p.badge !== null && (
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      p.badge >= 70
                        ? "bg-green-100 text-green-700"
                        : p.badge >= 40
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.badge}/100
                  </span>
                )}

                <span className="text-gray-400 text-sm">→</span>
              </a>
            ))}
            </div>

            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
              <p className="text-xs text-yellow-700">
                ⚠️ <strong>Always verify manually.</strong> Check that the
                company page matches the one in the offer letter. Look for
                verified badges and employee count.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        {!results && !loading && (
          <div className="flex gap-2 flex-wrap justify-center mt-2">
            {["Wipro", "Infosys", "TCS", "Google"].map((name) => (
              <button
                key={name}
                onClick={() => { setQuery(name); }}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-500 px-3 py-1 rounded-full transition"
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-slate-600 text-xs mt-6 font-medium">
        Built to protect students from fake job offers
      </p>
    </div>
    </div>
  );
}