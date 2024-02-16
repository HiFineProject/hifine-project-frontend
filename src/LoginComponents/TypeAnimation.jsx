import { TypeAnimation } from 'react-type-animation';

const AnimationComponent = () => {
  return (
    <div className="flex items-center p-10 text-white" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <TypeAnimation
        sequence={[
          '',
          1000,
          'Welcome',
          1000,
          'Welcome to',
          1000,
          'Welcome to HiFine',
          1000
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
      />
    </div>
  );
};

export default AnimationComponent;