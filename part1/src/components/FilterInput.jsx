const FilterInput = ({ value, setValue }) => {
  return (
    <div>
      filter by:
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)} />
    </div>
  )
}

export default FilterInput