import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
   
    return (
        <header className = 'header'>
            <h2>{title}</h2>
            <Button 
            color={showAdd ? 'red' : 'green'} 
            text={showAdd ? 'close' : 'add'} 
            onClick = {onAdd} />
        </header>
    );
};

//can use a variable for styling
// const headingStyle = {
//     color: 'blue', 
//     backgroundColor: 'black'
// }
Header.propTypes = {
    title : PropTypes.string,
}
Header.defaultProps = {
    title: "Task Tracker"
}
export default Header;
