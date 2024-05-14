import Header from "./templates/Header";
import InteractiveList from "./templates/Tables";

const PatientReports = () => {
    return (
        <div>
            <Header userRole={"patient"} />
            <section id="reportPage">
                <h1 id="patientReport">My Report</h1>
                <>
                    <InteractiveList />
                </>
            </section>
        </div>
    );
};

export default PatientReports;
