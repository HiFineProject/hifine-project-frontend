import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const { pathname } = useLocation();
  const subpage = pathname.split("/")?.[1];

  const HighlightLink = (type = null) => {
    let classes =
      "flex justify-center w-full items-center rounded hover:bg-stone-100";
    if (type === subpage) {
      classes += "text-white bg-stone-200";
    } else {
      classes += " ";
    }
    return classes;
  };

  return (
    <ul className="flex justify-evenly h-full">
      <li className="flex w-1/3 p-1 rounded-lg">
        <Link to="/Home" className={HighlightLink("Home")}>
          <button className="flex justify-center items-center w-full rounded">
            <svg
              width="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill="#c3cad4" d="M9 21V13.6C9 13.0399 9 12.7599 9.109 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75993 12 10.04 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V21M2 9.5L11.04 2.72C11.3843 2.46181 11.5564 2.33271 11.7454 2.28294C11.9123 2.23902 12.0877 2.23902 12.2546 2.28295C12.4436 2.33271 12.6157 2.46181 12.96 2.72L22 9.5M4 8V17.8C4 18.9201 4 19.4802 4.21799 19.908C4.40974 20.2843 4.7157 20.5903 5.09202 20.782C5.51985 21 6.0799 21 7.2 21H16.8C17.9201 21 18.4802 21 18.908 20.782C19.2843 20.5903 19.5903 20.2843 19.782 19.908C20 19.4802 20 18.9201 20 17.8V8L13.92 3.44C13.2315 2.92361 12.8872 2.66542 12.5091 2.56589C12.1754 2.47804 11.8246 2.47804 11.4909 2.56589C11.1128 2.66542 10.7685 2.92361 10.08 3.44L4 8Z" stroke="#676665" />
            </svg>
          </button>
        </Link>
      </li>
      <li className="flex w-1/3 p-1 rounded-lg">
        <Link to="/Profile" className={HighlightLink("Profile")}>
          <button className="flex justify-center items-center w-full rounded">
            <svg
              width="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g id="style=fill">
                <g id="profile">
                  <path id="vector (Stroke)" d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#3a3a3a" />
                  <path id="rec (Stroke)" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z" fill="#676665" />
                </g>
              </g>
            </svg>
          </button>
        </Link>
      </li>
      <li className="flex w-1/3 p-1 rounded-lg">
        <Link to="/Lists" className={HighlightLink("Lists")}>
          <button className="flex justify-center items-center w-full rounded">
            <svg
              width="60px"
              version="1.1"
              id="图层_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40" >
              <g>
                <g>
                  <g>
                    <g>
                      <path fill="#231815" d="M26,16H14c-0.3,0-0.5-0.2-0.5-0.5S13.7,15,14,15h12c0.3,0,0.5,0.2,0.5,0.5S26.3,16,26,16z" />
                    </g>
                    <g>
                      <path fill="#231815" d="M26,20.5H14c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h12c0.3,0,0.5,0.2,0.5,0.5S26.3,20.5,26,20.5z" />
                    </g>
                    <g>
                      <path fill="#231815" d="M26,25H14c-0.3,0-0.5-0.2-0.5-0.5S13.7,24,14,24h12c0.3,0,0.5,0.2,0.5,0.5S26.3,25,26,25z" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
