interface Props {
  dimension?: number,
}

const Spinner: React.FC<Props> = ({ dimension = 20 }) => {
  return (
    <svg className="animate-rotate" viewBox="0 0 50 50" width={`${dimension}px`} height={`${dimension}px`}>
      <circle className="animate-logo stroke-gray-700" cx="25" cy="25" r="20" fill="none" strokeWidth="3px"></circle>
    </svg>
  )
}

export default Spinner;
