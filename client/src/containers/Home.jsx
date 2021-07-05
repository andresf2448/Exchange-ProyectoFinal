export const Home = () => {
    return (
        <div>
            <div className='navBar'>
                <ul>
                    <li>Logo</li>
                    <li>About</li>
                    <li>Other Exchanges</li>
                    <li>Wallet</li>
                    <li>Balance</li>
                    <li>Settings</li>
                    <li>Logout</li>
                </ul>
            </div>
            <div className='userData'>
                <ul>
                    <li>UserName</li>
                    <li>Cuenta</li>
                    <li>Saldo</li>
                    <li>otra cosa</li>
                </ul>
            </div>
            <div className='home-container'>
                <div className='home-container_boxLeft'>
                    <div className='crypto-graphics'>
                        <h3>CryptoGraphics</h3>
                    </div>
                    <div className='home-container_boxLeft--bottom'>
                        <div className='about'>
                            <h3>ABOUT</h3>
                        </div>
                        <div className='statistics'>
                            <h3>STATISTICS</h3>
                        </div>
                    </div>
                </div>
                <div className='home-container_boxRight'>
                    <div className='crypto-calculator'>
                        <h3>CryptoCalculator</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}