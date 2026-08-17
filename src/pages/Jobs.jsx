import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Saved() {
  const [savedJobs, setSavedJobs] = useState([]);

  // Load saved jobs from localStorage
  const loadSavedJobs = () => {
    const jobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    setSavedJobs(jobs);
  };

  useEffect(() => {
    loadSavedJobs();
  }, []);

  // Remove job
  const removeJob = (id) => {
    const updatedJobs = savedJobs.filter(
      (job) => job.id !== id
    );

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );

    setSavedJobs(updatedJobs);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 sm:mb-10">

          <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
            Your Collection
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Saved Jobs
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                Jobs you saved for later.
              </p>
            </div>

            {/* Job count */}
            {savedJobs.length > 0 && (
              <div className="w-fit rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
                {savedJobs.length}{" "}
                {savedJobs.length === 1 ? "Job" : "Jobs"} Saved
              </div>
            )}

          </div>

        </div>

        {/* Empty state */}
        {savedJobs.length === 0 ? (

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:px-10 sm:py-16">

            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              ♡
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
              No saved jobs
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
              Save jobs you're interested in and find them here.
            </p>

            <Link
              to="/jobs"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 hover:shadow-md"
            >
              Browse Jobs
            </Link>

          </div>

        ) : (

          /* Jobs */
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">

            {savedJobs.map((job) => (

              <article
                key={job.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-6"
              >

                {/* Top */}
                <div className="flex items-start justify-between gap-3 sm:gap-4">

                  {/* Company logo */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:h-14 sm:w-14">

                    {job.logo ? (
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";

                          e.currentTarget.parentElement.innerHTML = `
                            <span class="text-lg font-bold text-slate-400">
                              ${job.company?.charAt(0) || "?"}
                            </span>
                          `;
                        }}
                      />
                    ) : (
                      <span className="text-lg font-bold text-slate-400 sm:text-xl">
                        {job.company?.charAt(0) || "?"}
                      </span>
                    )}

                  </div>

                  {/* Job type */}
                  <span className="max-w-[110px] truncate rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100 sm:max-w-[120px] sm:px-3">
                    {job.type}
                  </span>

                </div>

                {/* Content */}
                <div className="mt-5 flex-1">

                  <h2 className="line-clamp-2 min-h-[52px] text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-blue-700 sm:min-h-[56px] sm:text-xl">
                    {job.title}
                  </h2>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-500 sm:text-base">
                    {job.company}
                  </p>

                  <div className="mt-5 space-y-3 text-sm text-slate-500">

                    {/* Location */}
                    <p className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0">
                        📍
                      </span>

                      <span className="line-clamp-2">
                        {job.location}
                      </span>
                    </p>

                    {/* Salary */}
                    <p className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0">
                        💰
                      </span>

                      <span className="line-clamp-2">
                        {job.salary}
                      </span>
                    </p>

                  </div>

                </div>

                {/* Buttons */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {/* View Details */}
                  <Link
                    to={`/job/${job.id}`}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    View Details
                  </Link>

                  {/* Remove */}
                  <button
                    onClick={() => removeJob(job.id)}
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-100 transition-all hover:bg-red-100"
                  >
                    ♥ Remove
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}

export default Saved;