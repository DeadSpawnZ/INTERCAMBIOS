import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONArray;

/**
 *
 * @author Spawn
 */
public class Agrega_Amigos extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        HttpSession misession = (HttpSession) request.getSession();
        String id_usuario1 = (String) misession.getAttribute("id_usuario");
        String id_usuario2 = (String)request.getParameter("correo");
        String nombre_relativo = (String)request.getParameter("nombre_relativo");
        JSONArray user_reg = Conexion.consultar("SELECT * FROM usuario WHERE correo = '"+id_usuario2+"';");
        if(user_reg.size() == 1){
            JSONArray reg_amigo = Conexion.consultar("SELECT * FROM amistad WHERE id_usuario1 = '"+id_usuario1+"' AND id_usuario2 = '"+id_usuario2+"';");
            if(reg_amigo.size() == 1){
                response.getWriter().write("YA ES TU AMIGO");
            }else{
                String reg_noamigo = Conexion.insertar("INSERT INTO amistad(id_usuario1, id_usuario2, nombre_relativo) VALUES('"+id_usuario1+"','"+id_usuario2+"','"+nombre_relativo+"');");
                response.getWriter().write("AMIGO AGREGADO1");
            }
        }else{
            JSONArray user_noreg = Conexion.consultar("SELECT * FROM usuario_n WHERE correo = '"+id_usuario2+"';");
            if(user_noreg.size() == 1){
                String noreg_noamigo = Conexion.insertar("INSERT INTO amistad_n(id_usuario1, id_usuario2, nombre_relativo) VALUES('"+id_usuario1+"','"+id_usuario2+"','"+nombre_relativo+"');");
                response.getWriter().write("AMIGO AGREGADO2");
            }else{
                String XD = Conexion.insertar("INSERT INTO usuario_n(correo) VALUES('"+id_usuario2+"');");
                String noreg_noamigo = Conexion.insertar("INSERT INTO amistad_n(id_usuario1, id_usuario2, nombre_relativo) VALUES('"+id_usuario1+"','"+id_usuario2+"','"+nombre_relativo+"');");
                response.getWriter().write("AMIGO AGREGADO2");
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
