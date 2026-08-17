import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const [submittedSearch, setSubmittedSearch] = useState("");
  const [submittedLocation, setSubmittedLocation] = useState("");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch jobs
  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("https://remotive.com/api/remote-jobs?limit=20")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        return response.json();
      })
      .then((data) => {
        const formattedJobs = data.jobs.map((job) => ({
          id: job.id,
          title: job.title,
          company: job.company_name,
          location: job.candidate_required_location || "Worldwide",
          type: job.job_type || "Remote",
          salary: job.salary || "Salary not specified",
          url: job.url,
          logo: job.company_logo,
          description: job.description,
        }));

        setJobs(formattedJobs);

        localStorage.setItem(
          "jobs",
          JSON.stringify(formattedJobs)
        );
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Search
  const handleSearch = () => {
    setSubmittedSearch(search);
    setSubmittedLocation(location);
  };

  // Clear
  const clearSearch = () => {
    setSearch("");
    setLocation("");
    setSubmittedSearch("");
    setSubmittedLocation("");
  };

  // Filter
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      submittedSearch === "" ||
      job.title
        .toLowerCase()
        .includes(submittedSearch.toLowerCase());

    const matchesLocation =
      submittedLocation === "" ||
      job.location
        .toLowerCase()
        .includes(submittedLocation.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl"></div>

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl"></div>

        <div className="relative mx-auto max-w-5xl text-center">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold tracking-wide text-blue-700 shadow-sm sm:text-sm">
            🚀 YOUR NEXT CAREER STARTS HERE
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find Your Next
            <span className="block text-blue-600">
              Remote Opportunity
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-lg sm:leading-8">
            Discover remote jobs from companies around the world
            and find the opportunity that's right for you.
          </p>

          {/* Search box */}
          <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60 sm:mt-10 sm:p-4">

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto]">

              {/* Job search */}
              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Job title, keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:text-base"
                />

              </div>

              {/* Location */}
              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  📍
                </span>

                <input
                  type="text"
                  placeholder="Location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:text-base"
                />

              </div>

              {/* Search button */}
              <button
                type="button"
                onClick={handleSearch}
                className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
              >
                Search Jobs
              </button>

              {/* Clear button */}
              <button
                type="button"
                onClick={clearSearch}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]"
              >
                Clear
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* Jobs section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

        {/* Section heading */}
        <div className="mb-7 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Explore opportunities
            </span>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Featured Jobs
            </h2>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              {filteredJobs.length} jobs found
            </p>

          </div>

          {/* Search status */}
          {(submittedSearch || submittedLocation) && (
            <div className="rounded-xl bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700 sm:text-sm">
              Showing filtered results
            </div>
          )}

        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">

            <div className="mx-auto mb-5 h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

            <h3 className="font-semibold text-slate-900">
              Finding the latest jobs...
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Please wait a moment.
            </p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center sm:p-10">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-2xl">
              ⚠️
            </div>

            <h3 className="mt-4 text-lg font-bold text-red-800 sm:text-xl">
              Something went wrong
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-red-600">
              {error}
            </p>

            <p className="mt-2 text-xs text-red-500">
              Please check your internet connection and try again.
            </p>

          </div>
        )}

        {/* Jobs */}
        {!loading && !error && (
          <>
            {filteredJobs.length > 0 ? (

              <div className="grid items-stretch gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">

                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ))}

              </div>

            ) : (

              /* Empty state */
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:px-10 sm:py-16">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                  🔎
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  No jobs found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                  Try another job title or location to find more opportunities.
                </p>

                <button
                  onClick={clearSearch}
                  className="mt-5 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Clear Search
                </button>

              </div>

            )}
          </>
        )}

        {/* Attribution */}
        <p className="mt-10 text-center text-xs text-slate-400">
          Job listings sourced from{" "}
          <a
            href="https://remotive.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-500 hover:text-blue-600 hover:underline"
          >
            Remotive
          </a>
          .
        </p>

      </section>

    </main>
  );
}

export default Home;