import "./DropDown.css";

interface DropdownProps {
  label?: string;
  options: string[];
  onSelect?: (selected: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label = "Välj roll", options, onSelect }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onSelect) {
      onSelect(event.target.value);
    }
  };

  return (
    <div className="custom-select">
      <select onChange={handleChange}>
        <option value="">{label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
