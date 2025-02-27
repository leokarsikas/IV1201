import "./DropDown.css"

interface DropdownProps {
  label?: string;
  options: string[];
  onSelect?: (selected: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label = "Välj roll", options, onSelect }) => {
 

  return (
    <div className="custom-select">
      <select>
        <option>{label}</option>
        <option value={options[0]}>{options[0]} </option>
        <option value={options[1]}> {options[1]}</option>
        <option value={options[2]}> {options[2]}</option>
      </select>
      
    </div>
  );
};

export default Dropdown;
