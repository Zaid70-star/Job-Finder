import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

function Saved() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    setSavedJobs(jobs);
  }, []);

  const handleUnsave = (jobId) => {
    const savedJobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    const updatedJobs = savedJobs.filter(
      (job) => job.id !== jobId
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
        <div className="mb-7 sm:mb-9">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
            Your Collection
          </span>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Saved Jobs
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Keep track of the opportunities you want to apply for later.
          </p>
        </div>

        {/* Empty state */}
        {savedJobs.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-10">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              ♡
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No saved jobs yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
              Save interesting jobs from the job details page and they will appear here.
            </p>

          </div>
        ) : (

          /* Saved jobs */
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">

            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col"
              >

                <JobCard job={job} />

                {/* Unsave */}
                <button
                  onClick={() => handleUnsave(job.id)}
                  className="mt-3 w-full rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-100 transition-all hover:bg-red-100"
                >
                  ♥ Unsave Job
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

export default Saved;