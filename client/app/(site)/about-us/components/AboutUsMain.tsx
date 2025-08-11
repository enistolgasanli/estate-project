import AboutUsValues from "./AboutUsValues";

export default function AboutUsMain() {
    return (
        <div className="w-full flex items-center justify-center mt-20">
            <div className="w-full max-w-5/6 space-y-16">
                <AboutUsValues
                    title="Vizyon"
                    text="  Vizyonumuz akıllı teknoloji ve güvenilir hizmet sayesinde gayrimenkül sektörünün daha kolay, daha insancıl hale geleceği bir gelecekten ilham almaktadır."
                    listTitle="Vizyon Açıklama"
                    listItem={[
                        { text: "Güvenilir ve kullanıcı dostu bir platform oluşturun." }
                    ]}
                    reverse={false}
                />
                <AboutUsValues
                    title="Misyon"
                    text="  Vizyonumuz akıllı teknoloji ve güvenilir hizmet sayesinde gayrimenkül sektörünün daha kolay, daha insancıl hale geleceği bir gelecekten ilham almaktadır."
                    listTitle="Misyon Açıklama"
                    listItem={[
                        { text: "Güvenilir ve kullanıcı dostu bir platform oluşturun." }
                    ]}
                    reverse={true}
                />
            </div>
        </div>
    );
}