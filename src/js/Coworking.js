import React, { useState } from 'react';
import { tambah_data } from './services';
import Swal from 'sweetalert2';

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

const alertBerhasil = () => {
    Swal.fire({
        icon: 'success',
        title: 'Berhasil, data anda sudah tersimpan',
        text: 'Terimakasih atas partisipasinya ..',
        showConfirmButton: false,
        timer: 3500,
    }).then(() => {
        window.location.reload();
    });
};

const alertError = (err) => {
    Swal.fire({
        icon: 'error',
        title: 'Error, Terjadi Kesalahan!',
        text: `Terjadi kesalahan pada "${err} .."`
    }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
            window.location.reload();
        }
    });
};

const Coworking = ()=>{
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nohp, setNohp] = useState('');
    
    const handleKirim = async()=>{
        let data = {};
        if(handleNama(nama) && handleNohp(nohp)){
            data = {
                nama : nama,
                alamat: alamat,
                nohp: nohp,
                tgl: formattedDate
            }
            try{
                let result = await tambah_data('tb_coworking', data);
                if(result.success === true){
                    alertBerhasil();
                }else{
                    alertError(result.message);
                    console.log(result.message);
                }
            } catch(error) {
                alertError(error);
                console.error('Error posting', error);
            }
        }
    };

    const handleNohp = (value) => {
        let tool = document.querySelector('#tooltipnohp');
        let inputnohp = document.querySelector('#inputnohp');
        if (value === '') {
            tool.classList.add('d-block');
            inputnohp.classList.add('is-invalid');
            setNohp(value);
            return false;
        } else {
            tool.classList.remove('d-block');
            inputnohp.classList.remove('is-invalid');
            setNohp(value);
            return true;
        }
    };

    const handleNama = (value) =>{
        let tool = document.querySelector('#tooltipnama');
        let inputnama = document.querySelector('#inputnama');
        if (value === '') {
            tool.classList.add('d-block');
            inputnama.classList.add('is-invalid');
            setNama(value);
            return false;
        } else {
            tool.classList.remove('d-block');
            inputnama.classList.remove('is-invalid');
            setNama(value);
            return true;
        }
    }

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
                                            <input onChange={(event) => handleNama(event.target.value)} type="nama" className="form-control" id='inputnama' aria-describedby="nama" placeholder='Isi Namamu Disini ..' />
                                            <div id='tooltipnama' className="invalid-tooltip">
                                                Lengkapi nama mu ..
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                        <textarea onChange={(event) => setAlamat(event.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Isi Alamatmu disini ..'></textarea>
                                        </div>
                                        <div className="mb-3 input-group has-validation">
                                            <input onChange={(event) => handleNohp(event.target.value)} type="text" className="form-control" id='inputnohp' aria-describedby="nama" placeholder='Lengkapi dengan nomor Hpmu ..' />
                                            <div id='tooltipnohp' className="invalid-tooltip">
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