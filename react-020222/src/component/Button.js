import PropTypes from 'prop-types';


const Button = ({color, text}) => {

  const onClick = (e) =>{
      console.log(e);
  }

  return(
    <button className='btn' 
            style={{backgroundColor: color}}
            onClick={onClick}>
                {text}
    </button>
  );
};

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
}

export default Button;
