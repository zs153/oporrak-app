import axios from 'axios'

export const mainPage = async (req, res) => {
  const user = req.user

  try {
    res.render('admin', { user })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
};
