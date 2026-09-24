const HeroSection = () => {
    return (  
        <div>
            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="display-4">
                             Shaping your<br/>future with the best<br/>recruitment
                             </h1>
                             <p className="fs-5 text-muted">
                                Growth and success go hand in hand. We will help you with it.<br/>
                                Focus on getting your dream job
                             </p>
                             <p>
                                <form>
                                    <div className="input-group input-group-sm style={{width:50%}}">
                                        <input type="text className="form-control placeholder="Leave us your email"/>
                                        <button className="btn btn-primary">
                                            Get Notifications
                                            </button>
                                    </div>
                                </form>
                                <div className="d-flex my-3">
                                    <h6 className="me-3">
                                        <i class="bi bi-check-circle-fill"></i>
                                        <span ms-3 >Update me Everyday</span>
                                    </h6>
                                    <h6>
                                        <i class="bi bi-check-circle-fill"></i>
                                    </h6>
                                    <span ms-3>Easy Application From The Email</span>
                                </div>
                             </p>
                    </div>
                    <div className="col-md-6">
                        2
                    </div>
                    <div className="col-md-6">
                        3
                    </div>
                    <div className="col-md-6">
                        4
                    </div>
                    <div className="col-md-6">
                        5
                    </div>
                    <div className="col-md-6">
                        6
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default HeroSection;