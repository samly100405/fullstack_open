const DetailedCountry = ({ country }) => {
    if (!country) return null

    return (
        <div className="detailed-country">
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {
                    Object.values(country.languages)
                    .map(
                        (elem) => {
                            return <li key={elem}>{elem}</li>
                        }
                    )
                }
            </ul>
            <img src={country.flags.svg} alt="ligma" width={300}/>
        </div>
    )
}

export default DetailedCountry