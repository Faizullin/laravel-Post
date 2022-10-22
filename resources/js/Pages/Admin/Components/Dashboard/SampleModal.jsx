
export default function SampleModal(){
    return (
        <>
            <div id="sample-modal" className="modal">
                <div className="modal-background --jb-modal-close"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title">Sample modal</p>
                    </header>
                    <section className="modal-card-body">
                    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
                    <p>This is sample modal</p>
                    </section>
                    <footer className="modal-card-foot">
                    <button className="button --jb-modal-close">Cancel</button>
                    <button className="button red --jb-modal-close">Confirm</button>
                    </footer>
                </div>
            </div>

            <div id="sample-modal-2" className="modal">
                <div className="modal-background --jb-modal-close"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title">Sample modal</p>
                    </header>
                    <section className="modal-card-body">
                    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
                    <p>This is sample modal</p>
                    </section>
                    <footer className="modal-card-foot">
                    <button className="button --jb-modal-close">Cancel</button>
                    <button className="button blue --jb-modal-close">Confirm</button>
                    </footer>
                </div>
            </div>
        </>
    );
}
