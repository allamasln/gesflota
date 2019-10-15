export default function checkRoles(roles) {
	return function (req, res, next) {
		if (req.isAuthenticated() && roles.includes(req.user.role)) {
			return next();
		} else {
			if (req.isAuthenticated()) {
				res.redirect('/')
			}	else {
				res.redirect('/login')
			}
		}
	}
}