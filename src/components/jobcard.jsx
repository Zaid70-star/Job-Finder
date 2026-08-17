import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-6">

      {/* Top section */}
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

      {/* Job content */}
      <div className="mt-5 flex-1">

        <h3 className="line-clamp-2 min-h-[52px] text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-blue-700 sm:min-h-[56px] sm:text-xl">
          {job.title}
        </h3>

        <p className="mt-1 truncate text-sm font-semibold text-slate-500 sm:text-base">
          {job.company}
        </p>

        <div className="mt-5 space-y-3 text-sm text-slate-500">

          {/* Location */}
          <p className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0">📍</span>

            <span className="line-clamp-2">
              {job.location}
            </span>
          </p>

          {/* Salary */}
          <p className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0">💰</span>

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

        {/* Apply */}
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-blue-600"
        >
          Apply →
        </a>

      </div>

    </article>
  );
}

export default JobCard;