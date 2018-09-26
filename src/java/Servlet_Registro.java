import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
/**
 *
 * @author Spawn
 */
public class Servlet_Registro extends HttpServlet {

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
        String correo = (String)request.getParameter("correo");
        String pass = (String)request.getParameter("pass");
        String nombre = (String)request.getParameter("nombre");
        String apellidop = (String)request.getParameter("apellidop");
        String apellidom = (String)request.getParameter("apellidom");
        String alias = (String)request.getParameter("alias");
        
        JSONArray user = Conexion.consultar("SELECT * FROM usuario WHERE correo = '"+correo+"';");
        JSONArray user_n = Conexion.consultar("SELECT * FROM usuario_n WHERE correo = '"+correo+"';");
        
        if(user.size() == 1){
            response.getWriter().write("CORREO YA REGISTRADO");
        }else{
            if(user_n.size() == 1){
                //DESMADRE
                String resp = Conexion.insertar("INSERT INTO usuario(correo, pass, nombre, apellidop, apellidom, alias) VALUES('"+correo+"','"+pass+"','"+nombre+"','"+apellidop+"','"+apellidom+"','"+alias+"');");
                JSONArray amistades_n = Conexion.consultar("SELECT id_usuario1, nombre_relativo FROM amistad_n WHERE id_usuario2 = '"+correo+"';");
                for(int i = 0; i < amistades_n.size(); i++){
                    JSONObject obj = (JSONObject)amistades_n.get(i);
                    Object id_us1 = "id_usuario1";
                    Object n_r = "nombre_relativo";
                    String id_usuario1 = (String) obj.get(id_us1);
                    String nombre_relativo = (String) obj.get(n_r);
                    String alv = Conexion.insertar("INSERT INTO amistad(id_usuario1, id_usuario2, nombre_relativo) VALUES('"+id_usuario1+"','"+correo+"','"+nombre_relativo+"');");
                    System.out.println("ALV: "+alv);
                }
                String gg = Conexion.insertar("DELETE FROM usuario_n WHERE correo = '"+correo+"';");
                response.getWriter().write(gg);
            }else{
                String resp = Conexion.insertar("INSERT INTO usuario(correo, pass, nombre, apellidop, apellidom, alias) VALUES('"+correo+"','"+pass+"','"+nombre+"','"+apellidop+"','"+apellidom+"','"+alias+"');");
                response.getWriter().write(resp);
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
