import Image from 'next/image'

const Navbar = () => {
    return (
    <div className="nav-container">
        <span>
          <Image src="/6119a8ddf9bf69a32c0806b3_Fill Dark.svg" alt="LH Logo" width={130} height={35} />
        </span>
        <button className="nav-button">
            View Repo on Github
        </button>
  </div>
    )
}

export default Navbar