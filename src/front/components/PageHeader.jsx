// Este componente recibirá el título y el subtítulo como props
export const PageHeader = ({ title, lead }) => {
    return (
        <div style={{
            background: '#3374beff', // El color azul característico
            padding: '3rem',
            color: 'white',
            borderBottomLeftRadius: '30px',
            borderBottomRightRadius: '30px',
            borderTopRightRadius: '30px',
            borderTopLeftRadius: '30px',
            marginBottom: '2rem',
            fontFamily: 'Arial, sans-serif',
        }}>
            <div className="container text-center">
                <h1>{title}</h1>
                <p className="lead">{lead}</p>
            </div>
        </div>
    );
};