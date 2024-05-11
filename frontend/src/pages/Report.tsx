import Header from './templates/Header';
import '../../../static/patient/css/Report.css';
import xrayImg from '../../../static/images/xray.png';

const Report = () => {
  return (
    <div>
      <Header userRole={'patient'}/>

      <section id="reportPage">
        <h1 id="patientReport">My Report</h1>

        <div id="reportBox">
          <img src={xrayImg} id="xrayImg" alt="Patient X-ray" />
          <table id="reportTable">
            <tbody>
              <tr>
                <th><label className="reportLabel" htmlFor="id">Patient ID</label></th>
                <td>: T0992</td>
              </tr>

              <tr>
                <th><label className="reportLabel" htmlFor="name">Patient Name</label></th>
                <td>: Bryant Ng</td>
              </tr>
              <tr>
                <th><label className="reportLabel" htmlFor="status">Covid-19 Diagnosis status</label></th>
                <td>: Completed</td>
              </tr>
              <tr>
                <th><label className="reportLabel" htmlFor="status">Covid-19 Diagnosis outcome</label></th>
                <td>: Positive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Report;
