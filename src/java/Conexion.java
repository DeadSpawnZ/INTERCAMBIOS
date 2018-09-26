import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Spawn
 */
public class Conexion {
    static Connection con = null;
    static Statement stm = null;
    static ResultSet r = null;
    static String base = "inter";
    static String usuario = "root";
    static String contraseña = "proyectos";
    
    public static void conectar(){
        try{
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            con = DriverManager.getConnection("jdbc:mysql://localhost/"+base, usuario, contraseña);
            stm = con.createStatement();
        }catch(SQLException ex){
            System.out.println(ex.getMessage());
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void cerrar(){
        try{
            con.close();
        }catch(SQLException ex){
            System.out.println(ex.getMessage()+" ERROR EN METODO CERAR");
        }
    }
    public static String insertar(String query){
        String resp = "EXITO";
        try{
            conectar();
            stm.executeUpdate(query);
            cerrar();
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            resp = "ERROR EN INSERTAR";
        } 
        return resp;
    }
    
    public static JSONArray consultar(String query){
        JSONArray jsonArray;
        try{
            conectar();
            r = stm.executeQuery(query);
            //JSON CAGADERO
            jsonArray = new JSONArray();
            int tuplas = r.getMetaData().getColumnCount();
            while(r.next()){
                JSONObject obj = new JSONObject();
                for(int i = 0; i < tuplas; i++){
                    obj.put(r.getMetaData().getColumnLabel(i + 1).toLowerCase(),r.getObject(i + 1));
                }
                jsonArray.add(obj);
            }
            //FIN CAGADERO
            cerrar();
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            jsonArray = null;
        } 
        return jsonArray;
    }
}
