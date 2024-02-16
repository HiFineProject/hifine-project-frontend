import PropTypes from "prop-types";
import AnimationComponent from "./TypeAnimation";

function LoginLayout({ children }) {
  return (
    <div className="flex w-full h-full">
      <div className="flex-col relative w-3/5 h-screen font-bold text-5xl items-center hidden sm:flex">
        <AnimationComponent />
        <img className="h-full w-full" src="wave-getstarted.png"/>
      </div>
      <div className="w-full sm:w-2/5 h-screen mx-auto">
        {children}
      </div>
    </div>
  );
}

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginLayout;

