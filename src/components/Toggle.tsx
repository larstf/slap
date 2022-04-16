interface Props {
  value: boolean,
  onChange?: () => void,
}

const Toggle: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input 
            type="checkbox" 
            className="sr-only" 
            checked={value}
            onChange={() => onChange ? onChange() : false} 
            onClick={(e) => e.stopPropagation()} />
          <div className="bg bg-gray-100 w-14 h-8 rounded-full"></div>
          <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300"></div>
        </div>
      </label>

    </div>
  )
}

export default Toggle;