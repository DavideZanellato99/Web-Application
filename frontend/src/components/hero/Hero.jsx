import './Hero.css'

export default function Hero() {
    return (
        <div className="hero py-3 d-flex justify-content-center">
            <div className="col-11 col-sm-8 d-flex flex-column justify-content-center">

                <div className="col-12 d-flex justify-content-between align-items-center">
                    <img className="col-3 col-sm-1 rounded-circle"
                        src="/images/Logo Ospedale Verona.png"
                        alt="Logo Ospedale di Verona"
                    />
                    <span className='company'>
                        Azienda Ospedialiera Universitaria Integrata di Verona    
                    </span>
                    <img className="col-3 col-sm-1 rounded-circle"
                        src="/images/Logo Università Verona.png"
                        alt="Logo Università di Verona"
                    />
                </div>

                <div className="col-12 d-flex justify-content-center align-items-center flex-column flex-sm-row">
                    <div className="col-10 col-sm-4 d-grid align-items-center">
                        <img className="col-10 rounded-circle"
                            src="/images/Logo MISTRA.jpg"
                            alt="Logo MISTRA"
                        />
                        <div className="text-center text-primary image-text">
                            <span style={{color:"#3CBA25"}}>SE</span>
                            <span style={{color:"#F7D631"}}>XU</span>
                            <span style={{color:"#F77A0C"}}>AL </span>
                            <br/>
                            <span style={{color:"#E80C0C"}}>HE</span>
                            <span style={{color:"#F0B6C6"}}>AL</span>
                            <span style={{color:"#11BCF0"}}>TH</span>
                        </div>
                    </div>

                    <div className="col-12 col-sm-8 d-flex flex-column">
                        <span className='title'>CENTRO MISTRA</span>
                        <span className='subtitle'>
                            <b>Centro</b><br/>
                            <b>M</b>ultidisciplinare<br/>
                            <b>I</b>nfezioni <b>S</b>essualmente <b>Tra</b>smesse
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}