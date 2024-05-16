import React, { useState } from 'react';

const Coworking = ()=>{
    const [nohp, setNohp] = useState('');
    const handleKirim = ()=>{
        let tool = document.querySelector('#tooltip');
        let inputnohp = document.querySelector('#inputnohp');
        if (nohp === '') {
            tool.classList.add('d-block');
            inputnohp.classList.add('is-invalid');
        } else {
            tool.classList.remove('d-block');
            inputnohp.classList.remove('is-invalid');
        }
    };

    const handleNohp = (value) => {
        let tool = document.querySelector('#tooltip');
        let inputnohp = document.querySelector('#inputnohp');
        if (value === '') {
            tool.classList.add('d-block');
            inputnohp.classList.add('is-invalid');
        } else {
            tool.classList.remove('d-block');
            inputnohp.classList.remove('is-invalid');
        }
        setNohp(value);
    };

    return(
        <div>
			<div className="limiter">
				<div className="background-container">
					<div className="wrap">
                        <div className='container'>
							<div className='row text-center'>
								<div className='col'>
									<p className='p-0 m-0 fw-bold fs-3'><i>e - Tamu</i></p>
                                    <p className='p-0 m-0 fs-7'>Coworking Space</p>  
                                    <p className='p-0 m-0 fs-6 mb-3'>Pengadilan Negeri Banyumas</p>  
								</div>
							</div>
                            <div className='row'>
                                <div className='col'>
                                    <form>
                                        <div className="mb-2">
                                            <input type="nama" className="form-control" aria-describedby="nama" placeholder='Isi Namamu Disini ..' />
                                        </div>
                                        <div className="mb-2">
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Isi Alamatmu disini ..'></textarea>
                                        </div>
                                        <div className="mb-3 input-group has-validation">
                                            <input onChange={(event) => handleNohp(event.target.value)} type="text" className="form-control" id='inputnohp' aria-describedby="nama" placeholder='Lengkapi dengan nomor Hpmu ..' />
                                            <div id='tooltip' className="invalid-tooltip">
                                                Lengkapi nomor hp mu ..
                                            </div>
                                        </div>
                                        <div className='mb-4 text-center d-grid gap-2'>
                                            <button onClick={()=> handleKirim()} type="button" className="btn btn-outline-primary">Kirim</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Coworking;