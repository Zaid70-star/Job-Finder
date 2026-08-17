import { Link, useParams } from "react-router-dom";
import { useState } from "react";

function JobDetails() {
  const { id } = useParams();

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  const job = jobs.find(
    (job) => job.id.toString() === id
  );

  const [saved, setSaved] = useState(() => {
    const savedJobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    return savedJobs.some(
      (savedJob) => savedJob.id.toString() === id
    );
  });

  const handleSave = () => {
    const savedJobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (saved) {
      const updatedJobs = savedJobs.filter(
        (savedJob) => savedJob.id !== job.id
      );

      localStorage.setItem(
        "savedJobs",
        JSON.stringify(updatedJobs)
      );

      setSaved(false);
    } else {
      const updatedJobs = [...savedJobs, job];

      localStorage.setItem(
        "savedJobs",
        JSON.stringify(updatedJobs)
      );

      setSaved(true);
    }
  };

  if (!job) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-4xl">

          <Link
            to="/jobs"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline sm:text-base"
          >
            ← Back to Jobs
          </Link>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-10">

            <h1 className="text-2xl font-bold text-slate-900">
              Job not found
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              This job may no longer be available.
            </p>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          to="/jobs"
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline sm:text-base"
        >
          ← Back to Jobs
        </Link>

        {/* Job information */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-6 sm:p-8">

          <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center">

            {/* Company logo */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 sm:h-20 sm:w-20">

              {job.logo ? (
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xl font-bold text-slate-400 sm:text-2xl">
                  {job.company?.charAt(0) || "?"}
                </span>
              )}

            </div>

            {/* Job information */}
            <div className="min-w-0 flex-1">

              <span className="inline-flex max-w-full rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100 sm:text-sm">
                {job.type}
              </span>

              <h1 className="mt-3 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {job.title}
              </h1>

              <p className="mt-2 break-words text-base font-medium text-slate-500 sm:text-lg">
                {job.company}
              </p>

              <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-4">
                <span>📍 {job.location}</span>
                <span>💰 {job.salary}</span>
              </div>

            </div>

          </div>

        </section>

        {/* Description */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-6 sm:p-8">

          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Job Description
          </h2>

          <div
            className="prose prose-slate mt-5 max-w-none text-sm sm:mt-6 sm:text-base"
            dangerouslySetInnerHTML={{
              __html: job.description,
            }}
          />

        </section>

        {/* Actions */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm sm:mt-6 sm:p-8">

          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Interested in this position?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            Save this job or apply through the original listing.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* Save */}
            <button
              onClick={handleSave}
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition sm:px-8 sm:text-base ${
                saved
                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : "bg-slate-900 text-white hover:bg-slate-700"
              }`}
            >
              {saved ? "♥ Saved" : "♡ Save Job"}
            </button>

            {/* Apply */}
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-8 sm:text-base"
            >
              Apply for this Job →
            </a>

          </div>

        </section>

      </div>

    </main>
  );
}

export default JobDetails;