import React, { useEffect, useState } from 'react';
import { generateRandomString , formattedDate } from './services';
import DatePicker from 'react-datepicker';
import { differenceInYears, parse } from 'date-fns';
import { id } from 'date-fns/locale';

const Repel = () =>{
    const [data, setData] = useState({ userid: generateRandomString(5) });
    const [startDate, setStartDate] = useState(null);

    const handleSelect = (select) => {
        let form = document.getElementById('form-pengguna');
        let satu = form.querySelectorAll('.perorangan');
        let dua = form.querySelectorAll('.pemerintah');
        let tiga = form.querySelectorAll('.badanhukum');
        let empat = form.querySelectorAll('.keduanya');
        let basic = form.querySelectorAll('.basic');
    
        const removeClass = (nodeList, className) => {
            nodeList.forEach((node) => {
                if (node.classList.contains(className)) {
                    node.classList.remove(className);
                }
            });
        };
    
        const addClass = (nodeList, className) => {
            nodeList.forEach((node) => {
                if (!node.classList.contains(className)) {
                    node.classList.add(className);
                }
            });
        };
    
        switch(select) {
            case '1':
                removeClass(satu, 'hidethis');
                removeClass(basic, 'hidethis');
                addClass(dua, 'hidethis');
                addClass(tiga, 'hidethis');
                addClass(empat, 'hidethis');
                break;
            case '2':
                removeClass(dua, 'hidethis');
                removeClass(empat, 'hidethis');
                removeClass(basic, 'hidethis');
                addClass(satu, 'hidethis');
                addClass(tiga, 'hidethis');
                break;
            case '3':
                removeClass(tiga, 'hidethis');
                removeClass(empat, 'hidethis');
                removeClass(basic, 'hidethis');
                addClass(satu, 'hidethis');
                addClass(dua, 'hidethis');
                break;
            case '4':
                removeClass(satu, 'hidethis');
                removeClass(basic, 'hidethis');
                addClass(dua, 'hidethis');
                addClass(tiga, 'hidethis');
                addClass(empat, 'hidethis');
                break;
            default:
                addClass(satu, 'hidethis');
                addClass(dua, 'hidethis');
                addClass(tiga, 'hidethis');
                addClass(empat, 'hidethis');
                addClass(basic, 'hidethis');
        }

        let tmpdata = {...data};
        tmpdata.jenis = select;
        setData(tmpdata);
    };

    const handleValidate = (val, event, input, ket) =>{
        if(ket === 'wajib'){
            if(val === ''){
                event.target.classList.add('is-invalid');
            }else{
                event.target.classList.remove('is-invalid');
            }
        }

        let tmpdata = {...data};

        if(val !== ''){
            tmpdata[input] = val;
        }else{
            delete tmpdata[input];
        }

        setData(tmpdata);
    }

    useEffect(()=>{
        console.log(data);
    }, [data]);

    useEffect(()=>{
        if(startDate !== null){
            let tgl = document.getElementById('szTanggalLahir');
            let umur = document.getElementById('szUmur');
            let umurval = hitungUmur(formattedDate(startDate));
            handleValidate(formattedDate(startDate), tgl, 'tgl_lahir');
            umur.value = `${umurval}`;
            handleValidate(umurval, umur, 'umur');
        };
        // eslint-disable-next-line
    }, [startDate]);

    const hitungUmur = (tanggalLahir) =>{
        const tanggalLahirObj = parse(tanggalLahir, 'yyyy-MM-dd', new Date());
        const umur = differenceInYears(new Date(), tanggalLahirObj);
        return umur;
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
                                    <p className='p-0 m-0 fs-3'>Re - Pel</p>  
                                    <p className='p-0 m-0 fs-7'>Registrasi Pengguna Lain</p>  
                                    <p className='p-0 m-0 fs-6 mb-3'>Pengadilan Negeri Banyumas</p>  
								</div>
							</div>
                            <div className='row'>
                                <div className='col mb-4'>
                                    <form className="form-horizontal" id="form-pengguna" noValidate>
                                        <div className="form-group">
                                            <label className="col-md-6 control-label">Jenis Pihak <small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <select id="szJenisPihak" name="szJenisPihak" onChange={(event) => handleSelect(event.target.value)} className="form-control" style={{ width: '100%' }} aria-hidden="true">
                                                    <option value="-">Pilih</option>
                                                    <option value="1">Perorangan</option>
                                                    <option value="2">Pemerintah</option>
                                                    <option value="3">Badan Hukum</option>
                                                    <option value="4">Kuasa Insidentil</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group keduanya hidethis">
                                            <label className="col-md-6 control-label badanhukum hidethis" >Nama Perusahan/Organisasi<small style={{ color: 'tomato'}}>*</small></label>
                                            <label className="col-md-6 control-label pemerintah hidethis" >Nama Instansi<small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <input type="text"  className="form-control" id="szOrganisasi" name="szOrganisasi" />
                                            </div>
                                        </div>
                                        <div className="form-group badanhukum hidethis">
                                            <label className="col-md-6 control-label">Tanggal &amp; Nomor Akta Pendirian<small style={{ color: 'tomato'}}>*</small></label>
                                            <div className='row'>
                                                <div className="col-md-6">
                                                    <input type="text" name="szTanggalakta"  className="form-control datepicker" id="szTanggalakta" />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text"  className="form-control" id="szNmrakta" name="szNmrakta" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group badanhukum hidethis" >
                                            <label className="col-md-6 control-label">Tanggal &amp; Nomor SK Menteri Hukum dan HAM<small style={{ color: 'tomato'}}>*</small></label>
                                            <div className='row'>
                                                <div className="col-md-6">
                                                    <input type="text" name="szTanggalsk"  className="form-control datepicker" id="szTanggalsk" />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text"  className="form-control" id="szNomorsk" name="szNomorsk" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group badanhukum hidethis" >
                                            <label className="col-md-6 control-label">Alamat Badan Hukum<small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <input type="text"  className="form-control" id="szAlamatbakum1" name="szAlamatbakum1" data-parsley-required="true" />
                                            </div>
                                        </div>
                                        <div className="form-group pemerintah hidethis" >
                                            <label className="col-md-6 control-label">Alamat Instansi<small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <input type="text"  className="form-control" id="szAlamatbakum2" name="szAlamatbakum2" data-parsley-required="true" />
                                            </div>
                                        </div>
                                        <div className="form-group badanhukum hidethis" >
                                            <label className="col-md-6 control-label">E-Mail Badan Hukum<small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <input type="text"  className="form-control" id="szEmailbakum1" name="szEmailbakum1" data-parsley-required="true" />
                                            </div>
                                        </div>
                                        <div className="form-group pemerintah hidethis" >
                                            <label className="col-md-6 control-label">E-Mail Instansi<small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <input type="text"  className="form-control" id="szEmailbakum2" name="szEmailbakum2" data-parsley-required="true" />
                                            </div>
                                        </div>
                                        <div className="form-group basic hidethis">
                                            <label className="col-md-6 control-label pemerintah hidethis" >Nama Yang Mewakili/Yang Dikuasakan<small style={{ color: 'tomato'}}>*</small></label>
                                            <label className="col-md-6 control-label badanhukum hidethis" >Nama Yang Mewakili/Yang Dikuasakan<small style={{ color: 'tomato'}}>*</small></label>
                                            <label className="col-md-6 control-label perorangan hidethis" >Nama <small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <input onChange={(event) => handleValidate(event.target.value, event, 'nama', 'wajib')} type="text" name="szNama" className="form-control" id="szNama" data-parsley-required="true" />
                                                <small className='form-text'>Penulisan nama tidak diperbolehkan ada tanda petik ('), karena akan bermasalah pada tahap ePayment</small>
                                            </div>
                                        </div>
                                        <div className="form-group perorangan hidethis" >
                                            <label className="col-md-6 control-label">Tempat Lahir </label>
                                            <div className="col-md-12">
                                                <input onChange={(event) => handleValidate(event.target.value, event, 'tmpt_lahir')} type="text" name="szTempatLahir"  className="form-control" id="szTempatLahir" />
                                            </div>
                                        </div>
                                        <div className="form-group perorangan hidethis" >
                                            <label className="col-md-6 control-label">Tanggal Lahir </label>
                                            <div className="col-md-12">
                                                <DatePicker showMonthDropdown showYearDropdown dropdownMode="select" onChange={(event) => setStartDate(event)} selected={startDate} name="szTanggalLahir" id="szTanggalLahir" dateFormat='d MMMM yyyy' className='form-control' locale={id} />
                                                
                                            </div>
                                        </div>
                                        <div className="form-group perorangan hidethis" >
                                            <label className="col-md-6 control-label">Umur/Usia </label>
                                            <div className="col-md-12">
                                                <input type="text" name="szUmur" className="form-control" id="szUmur" />
                                            </div>
                                        </div>
                                        <div className="form-group basic hidethis" >
                                            <label className="col-md-6 control-label pemerintah hidethis" >NIP<small style={{ color: 'tomato'}}>*</small></label>
                                            <label className="col-md-6 control-label badanhukum hidethis" >Nomor Induk Kependudukan Yang Mewakili / Yang Dikuasakan<small style={{ color: 'tomato'}}>*</small></label>
                                            <label className="col-md-6 control-label perorangan hidethis" >Nomor Induk Kependudukan<small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <input type="text"  className="form-control" id="szNik" name="szNik" data-parsley-required="true" />
                                            </div>
                                        </div>
                                        <div className="form-group basic hidethis" >
                                            <label className="col-md-6 control-label">Bank<small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <select id="szBank" name="szBank" className="form-control " style={{ width: '100%' }} data-parsley-required="true" aria-hidden="true">
                                                    <option >Pilih</option>
                                                    <option value="1">A N Z PANIN</option>
                                                    <option value="2">ARTHA GRAHA</option>
                                                    <option value="3">ARTOS INDONESIA</option>
                                                    <option value="4">B C A</option>
                                                    <option value="5">B I I</option>
                                                    <option value="6">B J B</option>
                                                    <option value="7">B J B SYARIAH</option>
                                                    <option value="8">B N I</option>
                                                    <option value="9">B T N</option>
                                                    <option value="10">B R I</option>
                                                    <option value="11">BANK DKI</option>
                                                    <option value="12">BANK EKSEKUTIF</option>
                                                    <option value="13">BANK INA</option>
                                                    <option value="14">BANK INDEX</option>
                                                    <option value="15">BANK JASA JAKARTA</option>
                                                    <option value="16">BANK JTRUST INDONESIA</option>
                                                    <option value="17">BANK KESEJAHTERAAN</option>
                                                    <option value="18">BANK MANTAP</option>
                                                    <option value="19">BANK NAGARI</option>
                                                    <option value="20">Bank Nusantara Parahyangan</option>
                                                    <option value="21">Bank Of Tokyo-Mitsubishi UFJ</option>
                                                    <option value="22">BANK PAPUA</option>
                                                    <option value="23">BANK QNB</option>
                                                    <option value="24">BANK SAUDARA</option>
                                                    <option value="26">BANK VICTORIA INT</option>
                                                    <option value="27">BARCLAYS</option>
                                                    <option value="28">BPD ACEH</option>
                                                    <option value="29">BPD BALI</option>
                                                    <option value="30">BPD BENGKULU</option>
                                                    <option value="31">BPD DIY</option>
                                                    <option value="32">BPD JAMBI</option>
                                                    <option value="33">BPD JATENG</option>
                                                    <option value="34">BPD JATIM</option>
                                                    <option value="35">BPD KALBAR</option>
                                                    <option value="36">BPD KALSEL</option>
                                                    <option value="37">BPD KALTENG</option>
                                                    <option value="38">BPD KALTIM</option>
                                                    <option value="39">BPD LAMPUNG</option>
                                                    <option value="40">BPD MALUKU</option>
                                                    <option value="41">BPD NTB</option>
                                                    <option value="42">BPD NTT</option>
                                                    <option value="43">BPD RIAU</option>
                                                    <option value="44">BPD SULSEL</option>
                                                    <option value="45">BPD SULTENG</option>
                                                    <option value="46">BPD SULTRA</option>
                                                    <option value="47">BPD SULUT</option>
                                                    <option value="48">BPD SUMSEL BABEL</option>
                                                    <option value="49">BPD SUMUT</option>
                                                    <option value="50">BRI AGRO</option>
                                                    <option value="52">BTPN</option>
                                                    <option value="53">BUKOPIN</option>
                                                    <option value="54">BUMI ARTA</option>
                                                    <option value="55">CAPITAL</option>
                                                    <option value="56">CHINA CONSTRUCTION BANK</option>
                                                    <option value="57">CIMB NIAGA</option>
                                                    <option value="58">CITIBANK</option>
                                                    <option value="59">COMMONWEALTH</option>
                                                    <option value="60">DANAMON</option>
                                                    <option value="61">EKONOMI</option>
                                                    <option value="62">GANESHA</option>
                                                    <option value="63">H S B C</option>
                                                    <option value="64">MANDIRI</option>
                                                    <option value="65">MASPION</option>
                                                    <option value="66">MAYAPADA INT</option>
                                                    <option value="67">MAYORA</option>
                                                    <option value="68">MEGA</option>
                                                    <option value="69">MEGA SYARIAH</option>
                                                    <option value="70">MESTIKA</option>
                                                    <option value="71">MNC BANK</option>
                                                    <option value="72">MUAMALAT</option>
                                                    <option value="73">NOBU BANK</option>
                                                    <option value="74">OCBC NISP</option>
                                                    <option value="75">PANIN</option>
                                                    <option value="76">PERMATA</option>
                                                    <option value="77">R B S</option>
                                                    <option value="78">RABOBANK</option>
                                                    <option value="79">ROYAL</option>
                                                    <option value="80">S B I I</option>
                                                    <option value="81">S C B</option>
                                                    <option value="82">SINARMAS</option>
                                                    <option value="83">SWADESI</option>
                                                    <option value="84">U I B</option>
                                                    <option value="85">UOB BUANA</option>
                                                    <option value="86">BANK AGRIS</option>
                                                    <option value="89">BSI</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group basic hidethis" >
                                            <label className="col-md-6 control-label">No Rekening<small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <input type="text"  className="form-control" id="szNoRekening" name="szNoRekening" data-parsley-required="true" />
                                            </div>
                                        </div>
                                        <div className="form-group basic hidethis" >
                                            <label className="col-md-6 control-label">Akun Bank<small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <input type="text"  className="form-control" id="szAkunBank" name="szAkunBank" data-parsley-required="true" />
                                            </div>
                                        </div>
                                        <div className="form-group basic hidethis" >
                                            <label className="col-md-6 control-label">Nomor Telepon</label>
                                            <div className="col-md-12">
                                                <input type="text"  className="form-control" id="szNoTelepon" name="szNoTelepon" />
                                            </div>
                                        </div>
                                        <div className="form-group basic hidethis" >
                                            <label className="col-md-6 control-label">Handphone</label>
                                            <div className="col-md-12">
                                            <input type="text"  className="form-control" id="szHp" name="szHp" />
                                            </div>
                                        </div>
                                        <div className="form-group basic hidethis" >
                                            <label className="col-md-6 control-label pemerintah hidethis">E-Mail Yang Mewakili / Yang Dikuasakan<small style={{ color: 'tomato'}}>*</small></label>
                                            <label className="col-md-6 control-label badanhukum hidethis">E-Mail Yang Mewakili / Yang Dikuasakan<small style={{ color: 'tomato'}}>*</small></label>
                                            <label className="col-md-6 control-label perorangan">E-Mail <small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <input type="text"  className="form-control" id="email" name="szEmail" data-parsley-required="true" />
                                            </div>
                                        </div>
                                        <div className="form-group basic hidethis" >
                                            <label className="col-md-6 control-label pemerintah hidethis">Alamat Yang Mewakili / Yang Dikuasakan<small style={{ color: 'tomato'}}>*</small></label>
                        	                <label className="col-md-6 control-label badanhukum hidethis">Alamat Yang Mewakili / Yang Dikuasakan<small style={{ color: 'tomato'}}>*</small></label>
                                            <label className="col-md-6 control-label perorangan hidethis">Alamat <small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <textarea className='form-control' rows={3} id="alamat" name="szAlamat"></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group perorangan hidethis" >
                                            <label className="col-md-6 control-label">Jenis Kelamin</label>
                                            <div className="col-md-12">
                                                <select id="szJenisKelamin" name="szJenisKelamin" className="form-control" style={{ width: '100%'}}  aria-hidden="true">
                                                    <option value="-">Pilih</option>
                                                    <option value="L">Laki-Laki</option>
                                                    <option value="P">Perempuan</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group perorangan hidethis" >
                                            <label className="col-md-6 control-label">Agama</label>
                                            <div className="col-md-12">
                                                <select id="szAgama" name="szAgama" className="form-control" style={{ width: '100%'}}  aria-hidden="true">
                                                    <option value="-">Pilih</option>
                                                    <option value="Islam">Islam</option>
                                                    <option value="Protestan">Protestan</option>
                                                    <option value="Katolik">Katolik</option>
                                                    <option value="Budha">Budha</option>
                                                    <option value="Hindu">Hindu</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                    <option value="Kong Hu Cu">Kong Hu Cu</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group perorangan hidethis" >
                                            <label className="col-md-6 control-label">Pekerjaan<small style={{ color: 'tomato'}}>*</small></label>
                                            <div className="col-md-12">
                                                <input type="text"  className="form-control" id="szPekerjaan" name="szPekerjaan" data-parsley-required="true" />
                                            </div>
                                        </div>
                                        <div className="form-group perorangan hidethis" >
                                            <label className="col-md-6 control-label">Berkebutuhan Khusus</label>
                                            <div className="col-md-12">
                                                <select id="szDifabel" name="szDifabel" className="form-control " style={{ width: '100%' }}  aria-hidden="true">
                                                    <option value="T">Tidak</option>
                                                    <option value="Y"> Ya</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group perorangan hidethis" >
                                            <label className="col-md-6 control-label">Status Kawin</label>
                                            <div className="col-md-12">
                                                <select id="szStatusKawin" name="szStatusKawin" className="form-control " style={{ width: '100%' }}  aria-hidden="true">
                                                    <option value="-">Pilih</option>
                                                    <option value="1">Kawin</option>
                                                    <option value="2">Belum Kawin</option>
                                                    <option value="3">Duda</option>
                                                    <option value="4">Janda</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group perorangan hidethis" >
                                            <label className="col-md-6 control-label">Pendidikan</label>
                                            <div className="col-md-12">
                                                <select id="szPendidikan" name="szPendidikan" className="form-control " style={{ width: '100%' }}  aria-hidden="true">
                                                    <option value="-">Pilih</option>
                                                    <option value="0">Tidak Ada</option>
                                                    <option value="1">TK</option>
                                                    <option value="2">SD</option>
                                                    <option value="3">SLTP</option>
                                                    <option value="4">SMA</option>
                                                    <option value="5">D1</option>
                                                    <option value="6">D2</option>
                                                    <option value="7">D3</option>
                                                    <option value="8">D4</option>
                                                    <option value="9">S1</option>
                                                    <option value="10">S2</option>
                                                    <option value="11">S3</option>
                                                    <option value="12">Belum Sekolah</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mt-3 text-end basic hidethis">
                                            <button className='btn btn-sm btn-success'>Simpan</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Repel;